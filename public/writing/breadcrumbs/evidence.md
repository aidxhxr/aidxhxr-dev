# Breadcrumbs: sources and scope

Reviewed September 10, 2026.

The article combines the original personal write-up with a development note dated March 13, 2026. No matching public implementation repository was identified in the author's available public GitHub repositories. This is an unfinished prototype/design account, not a deployment report.

## Documented prototype work

The March note reports a helper that uploads captured images to Supabase Storage, inserts a draft post, and increments a daily submission counter. It describes camera loading/saved/failed feedback and a per-group counter in the feed. It explicitly identifies the group IDs as placeholders. The underlying implementation and hosted service were not independently executed or audited for this write-up.

## Proposed data model

The same note contains proposed SQL for profiles, groups, memberships, posts, daily submissions, reactions, and location samples. It proposes draft, queued, published, and expired post states; per-user/group/day submission counts; leader-controlled posting time; and configurable retention. The presence of SQL in the note is not evidence that the migration ran or that scheduling, storage cleanup, or access control worked end to end.

## Open design and implementation questions

- The original account describes five daily items as a limit; the development note describes reaching five as readiness for publication. The article identifies this unresolved difference rather than silently selecting a shipped behavior.
- The proposed group schema has a time of day but no group timezone.
- The proposed post-read policy checks membership without itself filtering by publication state or expiry. This is a limitation of the draft policy, not a claim of an observed production disclosure.
- Photo insertion and submission counting are described as separate operations. The notes do not establish transactional behavior or safe retries.
- The location table associates samples with users, without specifying which groups receive which portions of a trail.
- No user study, verified active-user count, automatic publish-job result, or storage-deletion test is claimed.

The suggestions about small-group trials, consent, scheduling, and counter semantics are current design reasoning. The raw development notes are not included because this curated summary is sufficient to identify the evidence and its limits.
