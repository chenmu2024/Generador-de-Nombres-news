# First-party analytics on Cloudflare

The site emits privacy-light events for navigation and product usage. The browser never includes user-entered names, search text, generated-name contents, or favorite contents in the analytics payload.

## Event schema

Cloudflare Analytics Engine column order:

| Column | Meaning |
| --- | --- |
| blob1 | event: `link_impression`, `link_click`, `page_arrival`, or `tool_action` |
| blob2 | placement |
| blob3 | role/action |
| blob4 | experiment ID |
| blob5 | source path |
| blob6 | target path |
| double1 | count (= 1) |
| double2 | browser timestamp |
| index1 | site hostname |

## Activation

1. In the Cloudflare Pages project, create an Analytics Engine binding named **ANALYTICS**.
2. Use a dataset name such as **gdn_events**.
3. Set the build-time environment variable:
   `NEXT_PUBLIC_ANALYTICS_ENDPOINT=/api/analytics`
4. Redeploy.

Without the binding, `/api/analytics` still returns HTTP 204 and does not persist events. Without `NEXT_PUBLIC_ANALYTICS_ENDPOINT`, the browser does not send events to the endpoint at all.

## Core metrics

### Link CTR

```sql
SELECT
  blob2 AS placement,
  blob4 AS experiment_id,
  SUM(CASE WHEN blob1 = 'link_impression' THEN _sample_interval ELSE 0 END) AS impressions,
  SUM(CASE WHEN blob1 = 'link_click' THEN _sample_interval ELSE 0 END) AS clicks
FROM gdn_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY placement, experiment_id
ORDER BY clicks DESC;
```

CTR = clicks / impressions.

### Second-page arrival rate

```sql
SELECT
  blob2 AS placement,
  blob4 AS experiment_id,
  SUM(CASE WHEN blob1 = 'link_click' THEN _sample_interval ELSE 0 END) AS clicks,
  SUM(CASE WHEN blob1 = 'page_arrival' THEN _sample_interval ELSE 0 END) AS arrivals
FROM gdn_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY placement, experiment_id
ORDER BY arrivals DESC;
```

Arrival rate = arrivals / clicks.

### Product actions

```sql
SELECT
  blob2 AS placement,
  blob3 AS action,
  SUM(_sample_interval) AS actions
FROM gdn_events
WHERE blob1 = 'tool_action'
  AND timestamp > NOW() - INTERVAL '7' DAY
GROUP BY placement, action
ORDER BY actions DESC;
```

This report supports Copy Rate, Favorite Rate, Filter Usage and Generate Rate once paired with page traffic or link-arrival denominators.
