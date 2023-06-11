import React from 'react';

function truncateHtml(html: string, maxLength: number): string {
  const parsedHtml = new DOMParser().parseFromString(html, 'text/html');
  let truncatedHtml = '';

  const walk = (node: Node) => {
    if (truncatedHtml.length >= maxLength) return;

    if (node.nodeType === Node.TEXT_NODE) {
      truncatedHtml += node.textContent!.substring(0, maxLength - truncatedHtml.length);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = (node as Element).tagName.toLowerCase();
      truncatedHtml += `<${tagName}>`;

      (node as Element).childNodes.forEach(walk);

      truncatedHtml += `</${tagName}>`;
    }
  };

  parsedHtml.body!.childNodes.forEach(walk);

  return truncatedHtml;
}

interface TruncatedHtmlProps {
  html: string;
  maxLength: number;
}

const TruncatedHtml: React.FC<TruncatedHtmlProps> = ({ html, maxLength }) => {
  const truncatedContent = truncateHtml(html, maxLength);

  return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />;
};

export default TruncatedHtml;
