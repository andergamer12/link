import React from 'react';
import QRItem from './QRItem';

function QRList({ qrs, onEditQR, onDeleteQR }) {
  return (
    <ul >
      {qrs.map(qr => (
        <QRItem
          key={qr._id}
          qr={qr}
          onEditQR={onEditQR}
          onDeleteQR={onDeleteQR}
        />
      ))}
    </ul>
  );
}

export default QRList;