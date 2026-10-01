# GDN Growth Loop

This repository treats search growth as a controlled loop, not as page-count growth.

## 1. Discover
Use Semrush, Google Search Console, Trends, forums and real user language to find a candidate query.

## 2. Validate
Before a new URL exists, check:
- demand
- search intent
- SERP overlap with an existing page
- whether an existing page can satisfy the query with a section/filter
- unique tool or data value
- page quality score

If a current page can satisfy the query, merge the intent into that page instead of creating a new route.

## 3. Publish
A new indexable URL must enter Keyword Master as VERIFIED/LOCKED and belong to a Topic Cluster.

## 4. Measure
Export Search Console query/page rows into the snapshot format in `data/gsc-snapshot.example.json`.

Run:

```bash
npm run gsc:report -- path/to/your-snapshot.json
```

Priority logic:
- HIGH: positions 8–20 with meaningful impressions
- MEDIUM: positions 20–40 with meaningful impressions
- WATCH: early demand, keep collecting data
- LOW: insufficient evidence

## 5. Optimize
For near-win queries, improve the existing page before considering another URL:
- title/description when CTR is weak
- tool usefulness
- intent-specific section
- internal links
- result data
- mobile UX

Log material changes as SEO experiments so ranking changes are not interpreted without context.
