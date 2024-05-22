### Common Git Commit Message Prefixes:

1. **feat** : New feature
2. **fix** : Bug fix
3. **chore** : Routine task or maintenance
4. **docs** : Documentation changes
5. **style** : Code style changes (formatting, missing semi-colons, etc.)
6. **refactor** : Code restructuring without changing external behavior
7. **perf** : Performance improvements
8. **test** : Adding or modifying tests
9. **build** : Changes to build process or dependencies
10. **ci** : Continuous Integration changes
11. **revert** : Reverting a previous commit

### When to Use `feature_name` vs `file_name`:

* **feature_name** : Use this when the commit is focused on implementing or modifying a specific feature. Example: `feat(authentication): add JWT support`.
* **file_name** : Use this when the commit is tightly coupled to a specific file or set of files but doesn't represent a whole feature. Example: `refactor(UserModel): simplify validation logic`.

In practice, the choice between `feature_name` and `file_name` often depends on the scope of the commit and how your team prefers to track changes. Some teams might prefer to always use `feature_name` for consistency, while others might opt for `file_name` when the change is localized to specific files.

git add src/types/plate-types.ts src/types/types.ts src/validators/loginSchema.ts src/validators/projectSchema.ts src/validators/registerSchema.ts
