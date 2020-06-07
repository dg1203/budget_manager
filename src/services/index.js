const logsDescriptions = {
  ADD_JAR: "Dodanie słoika",
  ADD_RESOURCES: "Dodanie środków do słoika",
  REMOVE_RESOURCES: "Wyjęcie środków ze słoika",
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
      jar.resources.push({ id: randomId(), ...resource });
    }
    return jar;
  });
  return jars;
};

const removeResource = (jars, resourceId, jarId) => {
  const jar = jars.find(jar => jar.id === jarId);
  const { resources } = jar;
  const newResources = resources.filter(resource => resource.id !== resourceId);
  const newJars = jars.map(jar => {
    if (jar.id === jarId) {
      jar.resources = newResources;
    }
    return jar;
  });
  return newJars;
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
    { id: "amount", numeric: false, disablePadding: false, label: "Kwota" }
  ];
  logs.forEach(log => {
    if (selectedJar !== "") {
      if (log.id === selectedJar) {
        rows.push({
          type: log.type,
          description: log.description,
          time: log.time,
          title: log[0] ? log[0] : "",
          amount: log[1] ? log[1] : ""
        });
      }
    } else {
      rows.push({
        type: log.type,
        description: log.description,
        time: log.time,
        title: log[0] ? log[0] : "",
        amount: log[1] ? log[1] : ""
      });
    }
  });
  return { header, rows };
};

const getFormatDate = time => {
  const date = new Date(time);
  return date.toLocaleString();
};

const getAvailableJars = (jars, resource, jarId) => {
  const availableJars = jars.filter(
    jar =>
      jar.id !== jarId &&
      (jar.currency === resource.currency || jar.currency === "")
  );
  return availableJars;
};

const transferResources = (jars, resource, jarId, targetId) => {
  const newJars = jars.map(jar => {
    if (jar.id === jarId) {
      jar.resources = jar.resources.filter(res => res.id !== resource.id);
    }
    if (jar.id === targetId) {
      jar.resources.push(resource);
    }
    return jar;
  });
  return newJars;
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
