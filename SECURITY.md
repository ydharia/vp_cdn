# Security disclosures -- VP_Panel_CDN

This document records security-relevant facts about the VP Panel CDN static
asset bundle for third-party reviewers.

## 1. Nature of this repository

This repository is a static asset bundle. It contains no server-side code,
no runtime processes, and no credential handling. All files are pre-built
JavaScript, CSS, fonts, and images served as static resources.

## 2. No secrets or credentials

This repository contains no API keys, passwords, or other credentials.
GitHub secret scanning and push protection are enabled at the repository
level.

## 3. Bundled third-party libraries

This bundle includes 53 vendored open-source libraries. All licences are
documented in `NOTICE.md`. One library requires specific attention:

**plupload v2.1.2 (GPL-2.0-or-later):** The bundled file upload library is
dual-licensed under GPL and a commercial licence. The GPL status is documented
in `NOTICE.md`. Replacement with a permissively-licensed alternative is
tracked as an engineering project.

## 4. Theme provenance

The admin UI layout derives from a commercial ThemeForest template. The
provenance question (Envato licence tier and transferability) is documented
in `UPSTREAM_PROVENANCE.md` and is being resolved through the legal track.

## How to report a security issue

Report security issues to **security@virtualpharmacist.co.uk**. We acknowledge
reports within two business days and follow a coordinated disclosure process.
