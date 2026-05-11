# Deployment Safety

## Purpose

This document defines the deployment safety rules for The Grid.

The Grid is not a normal portfolio site. Traversal, atmosphere, audio, events, and scene transitions are all part of the experience. A technically successful deploy can still damage the project if the experience quality drops.

---

# Core Safety Philosophy

A deployment is considered successful only if:

- the site functions
- the atmosphere survives
- traversal still feels spatial
- users can still orient themselves
- performance remains acceptable
- the experience still feels like The Grid

---

# Safe Deployment Pipeline

Preferred flow:

```txt
feature branch
→ preview deployment
→ automated checks
→ manual experience check
→ merge to main
→ production deploy
```

---

# Automated Checks

Before production deploy:

- build must pass
- typecheck must pass
- lint must pass
- smoke tests must pass
- deployment must complete successfully

---

# Manual Experience Check

Before merging, verify:

## Core Traversal

- boot sequence works
- homepage loads correctly
- transition into The Lab works
- node interactions still function
- dossier zoom still works

## Atmosphere

- audio levels feel reasonable
- ambience is not overwhelming
- UI is readable
- environment still feels immersive
- no accidental generic-dashboard feeling

## Performance

- homepage loads reasonably fast
- no massive stuttering
- audio does not desync badly
- animations do not freeze
- node map remains responsive

---

# Feature Flag Philosophy

Large features should launch hidden first.

Examples:

- hidden node
- unrevealed sector
- disabled lockdown event
- hidden route sign
- dormant anomaly

This allows:

- safe production deployment
- testing in production
- controlled reveals later

---

# Production Failure Rules

Rollback immediately if:

- traversal breaks
- homepage fails to load
- major audio bug occurs
- layout becomes unusable
- performance becomes unacceptable
- node interactions stop functioning

Do not attempt panic hotfixes directly on production if rollback is faster.

---

# Asset Safety Rules

Large assets are dangerous.

Before adding new assets:

- compress images
- optimize audio
- verify load impact
- avoid giant background videos unless necessary

The Grid should feel heavy atmospherically, not technically.

---

# Event System Safety

Global events should:

- remain rare
- remain restrained
- avoid interrupting users excessively
- avoid breaking navigation

Lockdown events should feel atmospheric, not annoying.

---

# Final Principle

The Grid is an atmosphere-first system.

Protect:

- traversal
- mood
- pacing
- readability
- immersion

before adding more features.
