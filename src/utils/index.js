const logsDescriptions = {
  ADD_JAR: "Dodanie słoika",
  ADD_RESOURCES: "Dodanie środków do słoika",
  REMOVE_RESOURCES: "Wyjęcie środków ze słoika"
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
      jar.resources.push({id: randomId(), ...resource});
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
}

export { randomId, addLog, addResource, removeResource };
