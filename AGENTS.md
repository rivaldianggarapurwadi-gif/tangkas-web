# Tangkas website workflow

The user requests that completed website changes be uploaded to the project's GitHub repository.

- After each requested change, run the relevant checks and build the website.
- Review the diff and commit the task's completed changes, then push to the configured GitHub remote. This is standing authorization for ordinary commits and pushes for this project.
- Do not force-push, overwrite unrelated work, or push to an unrelated repository.
- If no remote exists or authentication fails, report that synchronization is incomplete and request the missing connection information.
- Do not commit secrets, dependencies, temporary files, or unused video drafts. Keep the deployed hero video and required runtime assets tracked.
- This workflow applies to changes performed by the assistant; it does not install a background file watcher or silently upload arbitrary editor saves.
