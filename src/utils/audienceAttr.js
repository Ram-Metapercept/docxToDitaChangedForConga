
const { DOMParser, XMLSerializer } = require('xmldom');
function updateHtmlAttributesAndRemoveTags(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    function processAndRemoveParent(tagName, audienceValue) {
      const elements = doc.getElementsByTagName(tagName);

      for (let i = elements.length - 1; i >= 0; i--) {
        const parent = elements[i];
        const links = parent.getElementsByTagName('a');
        for (let j = 0; j < links.length; j++) {
          links[j].setAttribute('audience', audienceValue);
        }

        while (parent.firstChild) {
          parent.parentNode.insertBefore(parent.firstChild, parent);
        }

        parent.parentNode.removeChild(parent);
      }
    }
    processAndRemoveParent('audience1', 'CongaPlatform');
    processAndRemoveParent('audience2', 'Salesforce');

    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
  }


  module.exports = updateHtmlAttributesAndRemoveTags;