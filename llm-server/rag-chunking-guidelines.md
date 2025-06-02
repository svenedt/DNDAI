# RAG Chunking Guidelines for RPG Books

This document collects best practices and rules for splitting RPG books (like the Player's Handbook) into chunks for Retrieval-Augmented Generation (RAG).

## Initial Guidelines

1. **Chunk by Chapter First**

   - Use clear chapter headings (e.g., "Chapter X:") as primary boundaries.
   - Each chapter is a single chunk for initial ingestion.

2. **Further Split Large Chapters**

   - If a chapter exceeds ~10,000 words, consider splitting by subheading (e.g., "Race: Elf", "Class: Wizard") or every 1,000–2,000 words.
   - Preserve semantic meaning: avoid splitting in the middle of a table, stat block, or important rule.

3. **Metadata**

   - Store chunk metadata: chapter title, section, page range, and source filename.
   - This helps with traceability and context injection.

4. **Preserve Formatting**

   - Retain headings, lists, and tables in markdown for clarity.
   - Remove page numbers, footers, and headers unless contextually important.

5. **Review and Iterate**
   - After initial chunking, review retrieval quality.
   - Adjust chunk size, boundaries, or splitting rules as needed.

---

## To Do / Open Questions

- What is the optimal chunk size for D&D rules/lore?
- How to handle tables, stat blocks, and sidebars?
- Should we create a separate chunk for each spell, feat, or monster?
- How to handle cross-references and hyperlinks?

---

_Update this file as you discover new best practices!_
