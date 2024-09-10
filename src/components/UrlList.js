import React from 'react';
import UrlItem from './UrlItem';

function UrlList({ urls, onEditUrl, onDeleteUrl }) {
  return (
    <ul>
      {urls.map(url => (
        <UrlItem
          key={url._id}
          url={url}
          onEditUrl={onEditUrl}
          onDeleteUrl={onDeleteUrl}
        />
      ))}
    </ul>
  );
}

export default UrlList;
