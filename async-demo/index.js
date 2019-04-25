console.log("before");
/*
getUser(1, user => {
  console.log("Get user from database", user);
  getRepos(user.name, repos => {
    console.log(`${user.name} repos: ${repos}`);
    //getCommits()
  });
  // xmax tree problem
});
*/

/*
getUser(1)
  .then(user => getRepos(user.name))
  .then(res => console.log(`${res.user} repos: ${res.repos}`))
  .catch(error => console.log("Error", error.message));
*/

console.log("after");

// callback
/*
function getUser(id, callback) {
  setTimeout(() => {
    const user = { id, name: "Mario" };
    callback(user);
  }, 2000);
}
*/

// promise version
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { id, name: "Mario" };
      resolve(user);
    }, 2000);
  });
}

// exercise
/*
function getRepos(user, callback) {
  setTimeout(() => {
    console.log(`Getting ${user} repos...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
*/

// promise version

function getRepos(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting ${user} repos...`);
      resolve({ user, repos: ["repo1", "repo2", "repo3"] });
    }, 2000);
  });
}

// Asynx / await
displayRepos = async () => {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user.name);
    console.log("User", user.name);
    console.log("Repos", repos);
  } catch (error) {
    console.log("Error", error.message);
  }
};
displayRepos();
