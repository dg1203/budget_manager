const logsDescriptions = {
  ADD_JAR: "Dodanie słoika",
  ADD_RESOURCES: "Dodanie środków do słoika",
  REMOVE_RESOURCES: "Wypłata środków",
  TRANSFER_RESOURCES_FROM: "Transfer ze słoika",
  TRANSFER_RESOURCES_TO: "Transfer do słoika"
};

const randomId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

const addLog = (id, type, ...rest) => ({
  id,
  type,
  description: logsDescriptions[type],
  time: Date.now(),
  ...rest
});

const addResource = (jarsState, id, resource) => {
  const jars = jarsState.map(jar => {
    if (jar.id === id) {
      if (jar.resources.length === 0) {
        jar.resources.push({
          [resource.currency]: parseFloat(resource.amount)
        });
      } else {
        let found = false;
        jar.resources = jar.resources.map(res => {
          const object = Object.entries(res)[0];
          const [key, value] = object;
          if (key === resource.currency) {
            res = {
              [resource.currency]:
                parseFloat(value) + parseFloat(resource.amount)
            };
            found = true;
          }
          return res;
        });
        if (!found) {
          jar.resources.push({
            [resource.currency]: parseFloat(resource.amount)
          });
        }
      }
    }
    return jar;
  });
  return jars;
};

const removeResource = (jarsState, currency, amount, jarId) => {
  const jars = jarsState.map(jar => {
    if (jar.id === jarId) {
      jar.resources.forEach((res, index) => {
        res[currency] -= parseFloat(amount);
        if (res[currency] === 0) {
          jar.resources.splice(index, 1);
        }
      });
    }
    return jar;
  });
  return jars;
};

const transferResources = (jarState, amount, currency, jarId, targetId) => {
  const newJars = addResource(jarState, targetId, { currency, amount });
  const newestJars = removeResource(newJars, currency, amount, jarId);
  return newestJars;
};

const getJarHistory = (logs, jarId) => {
  const rows = [];
  const header = [
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Kod operacji"
    },
    { id: "description", numeric: false, disablePadding: false, label: "Opis" },
    { id: "title", numeric: false, disablePadding: false, label: "Tytuł" },
    { id: "amount", numeric: false, disablePadding: false, label: "Kwota" },
    { id: "currency", numeric: false, disablePadding: false, label: "Waluta" },
    {
      id: "time",
      numeric: false,
      disablePadding: false,
      label: "Data operacji"
    }
  ];
  logs.forEach(log => {
    if (log.id === jarId && log.type !== "ADD_JAR") {
      rows.push({
        type: log.type,
        description: log.description,
        title: log[0],
        amount: log[1],
        currency: log[2],
        time: log.time
      });
    }
  });
  return { header, rows };
};

const getAllHistory = (logs, selectedJar) => {
  const rows = [];
  const header = [
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Kod operacji"
    },
    { id: "description", numeric: false, disablePadding: false, label: "Opis" },
    {
      id: "time",
      numeric: false,
      disablePadding: false,
      label: "Data operacji"
    },
    { id: "title", numeric: false, disablePadding: false, label: "Tytuł" },
    { id: "amount", numeric: false, disablePadding: false, label: "Kwota" },
    { id: "currency", numeric: false, disablePadding: false, label: "Waluta" }
  ];
  logs.forEach(log => {
    if (selectedJar !== "") {
      if (log.id === selectedJar) {
        rows.push({
          type: log.type,
          description: log.description,
          time: log.time,
          title: log[0] ? log[0] : "",
          amount: log[1] ? log[1] : "",
          currency: log[2] ? log[2] : ""
        });
      }
    } else {
      rows.push({
        type: log.type,
        description: log.description,
        time: log.time,
        title: log[0] ? log[0] : "",
        amount: log[1] ? log[1] : "",
        currency: log[2] ? log[2] : ""
      });
    }
  });
  return { header, rows };
};

const getFormatDate = time => {
  const date = new Date(time);
  return date.toLocaleString();
};

const getAvailableJars = (jars, currency, jarId) => {
  const availableJars = jars.filter(
    jar =>
      jar.id !== jarId && (jar.currency === currency || jar.currency === "")
  );
  return availableJars;
};

export {
  randomId,
  addLog,
  addResource,
  removeResource,
  getJarHistory,
  getFormatDate,
  getAvailableJars,
  transferResources,
  getAllHistory
};
