# Sync All

This action allows a maintainer to define config for syncing files & secrets across different groups of repositories.

## How to Use

1. Select the repository that will be used for sharing files with other repositories (I recommend to use GitHub profile repo e.g. **zardoy/zardoy**)
2. Create a GitHub Action [like that](https://github.com/zardoy/zardoy/blob/master/.github/workflows/sync-all.yml).
3. Create a config file in root of the same repo [like that](https://github.com/zardoy/zardoy/blob/master/repos.json).

A config file (e.g. `repos.json`) contains groups of repositories each of that could have these fields:

```json5
{
    "secrets": ["synced-npm-token"], // an array of secret names to sync
    "repos": [// an array of repos to share the files & secrets
        "vk-params" // if repository on same user account you can specify only it's name
    ]
}
```

> This action is uses [Files Sync Action](https://github.com/marketplace/actions/files-sync-action) and [Secrets Sync Action](https://github.com/marketplace/actions/secrets-sync-action) underneath.

## Inputs

See `inputs` in [action.yml](action.yml).

## Example

See my [use-case](https://github.com/zardoy/zardoy/blob/master/.github/workflows/sync-all.yml).

## TODO

- [ ] DESIGN GOALS better README, describe Why config file and my site use-case
- [ ] VSCode extension
- [ ] use GitHub action for auto deploy this Action
