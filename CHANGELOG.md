# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- ...

## [2025-06-01]

### Added

- Robust tag parsing for TTS (supports [TAG], [TAG:], TAG:, etc.)
- Debug log panel in demo UI for troubleshooting parsing and voice assignment
- Persistent voice/platform settings in demo UI (localStorage)
- Extensive documentation: architecture, API, dev/user guides, troubleshooting, advanced usage
- GitHub Actions CI for Python tests
- Issue and pull request templates
- Advanced RAG ingestion: batch, scheduled, and automatic workflows
- Multi-voice TTS scripting and flexible persona/voice assignment

### Changed

- Overhauled README and project documentation for clarity and onboarding

### Fixed

- Prevented tag stacking and tags being spoken by TTS
- Improved error handling and troubleshooting guidance

---

Older changes are available in the project's commit history.
