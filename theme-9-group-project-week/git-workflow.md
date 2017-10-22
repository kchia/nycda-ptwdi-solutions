#1: Create a new repo on GitHub

#2: Create a new repo on command line

`mkdir my-new-repo`

`cd my-new-repo`

`echo "# my-new-repo" >> README.md`

`git init`

`git add README.md`

`git commit -m "first commit"`

`git remote add origin https://github.com/kchia/my-new-repo.git`

`git push -u origin master`

#3: All team members should clone the repo from github
`git clone https://github.com/kchia/my-new-repo.git`

#4: Say Person B makes changes on local repo and commits work to git

To view commit history, run `git log` from anywhere inside your directory.

To view changes on current branch, run `git diff`.

To stage changes, run `git add README.md`. 
You can also run `git add -A` to add all the files, directories and sub-directories.

To commit changes with a message, run `git commit -m "Edit file"`.

Finally, run `git push -u origin master`.

#5: Person A pulls Person B's changes from git. Always do this prior to committing code to master.
`git pull --rebase origin master`

Run `git log` to see if Person's B commit is now on your local repo.

#6: Say Person A and Person B are working on the same lines of code and encounter a merge conflict.
Person A makes changes to README.md and commits the new code to github repo.
Person B makes changes to same line of code in README.md and commits the code. 
When Person B tries to run `git pull --rebase origin master`, Person B encounters a merge conflict.

#7: Person B resolves conflict.
Person B opens the file and resolves the conflict. Once the file is fixed and saved, Person B runs the following:

`git add README.md`.

Run `git status` to make sure README.md has been staged.

Run `git rebase --continue`

#8: Person B commits change to master repo
`git push -u origin master`
