function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {

    function findHTMLPositions(plainTextPositions) {
      let result = [];
      let positionShift = 0;
      for (const position of plainTextPositions) {
        const start = position.start + positionShift;
        const end = position.end + positionShift;
        const plainTextToFind = plainText.substring(position.start, position.end);
        const startIndex = htmlContent.indexOf(plainTextToFind, start);
        if (startIndex !== -1) {
          const endIndex = startIndex + plainTextToFind.length;
          result.push({ start: startIndex, end: endIndex });
          positionShift = endIndex - position.end;
        }
      }
      return result;
    }
  
    const htmlTextPositions = findHTMLPositions(plainTextPositions);
  
    let result = htmlContent;
    let offset = 0;
    for (const position of htmlTextPositions) {
      const startTag = '<mark>';
      const endTag = '</mark>';
      const start = position.start + offset;
      const end = position.end + offset;
      result =
        result.slice(0, start) + startTag + result.slice(start, end) + endTag + result.slice(end);
      offset += startTag.length + endTag.length;
    }
    return result;
  }
  
