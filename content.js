// Prevent execution on kanjijump.com
if (window.location.hostname !== 'www.kanjijump.com') {
  // Regex for Kanji Unicode range
  const kanjiRegex = /[\u4e00-\u9faf]/g;

  function linkifyKanji(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (kanjiRegex.test(node.nodeValue)) {
        const span = document.createElement('span');
        let lastIndex = 0;
        node.nodeValue.replace(kanjiRegex, (kanji, idx) => {
          // Add text before Kanji
          if (idx > lastIndex) {
            span.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, idx)));
          }
          // Create link for Kanji
          const a = document.createElement('a');
          a.href = `https://www.kanjijump.com/dict/${encodeURIComponent(kanji)}`;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = kanji;
          a.style.textDecoration = 'underline';
          a.style.color = '#0070f3';
          span.appendChild(a);
          lastIndex = idx + 1;
        });
        // Add remaining text
        if (lastIndex < node.nodeValue.length) {
          span.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
        }
        node.replaceWith(span);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && !['SCRIPT', 'STYLE', 'A', 'TEXTAREA', 'INPUT'].includes(node.tagName)) {
      for (let child of Array.from(node.childNodes)) {
        linkifyKanji(child);
      }
    }
  }

  linkifyKanji(document.body);
}