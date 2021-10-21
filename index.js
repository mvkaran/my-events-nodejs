const github = require('@actions/github');
const core = require('@actions/core');
const dayjs = require('dayjs');

const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput('token');
    const octokit = new github.getOctokit(token);
    const context = github.context;

    const issue = context.payload.issue;
    const issueTitle = issue.title;

    // 2021-10-21: Actions Workshop
    const date = issue.title.substring(0,10);
    const quarter = dayjs(date).format('Q');

    const label = 'Q' + quarter.toString();

    await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
      labels: [label]
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
