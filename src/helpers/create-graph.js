export default () => {
  const nodes = [];
  const links = [];

  function processNode(page) {
    nodes.push(page);
    page.links.forEach((link) => {
      links.push({
        source: page.url,
        target: link.url,
        value: 1
      });
      processNode(link);
    });
  }

  processNode(response.page);
  return {
    nodes: nodes,
    links: links
  }
};
