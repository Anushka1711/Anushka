const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');

const number = '1706776983332';
const isSaudiAdmin = false;

QRCode.toFile('qrcode.png', number, {
  color: {
    dark: '#000',
    light: '#FFF'
  }
}, (err) => {
  if (err) throw err;

  const doc = new PDFDocument({ size: 'A4', margin: 20 });
  doc.pipe(fs.createWriteStream('animal_certificate.pdf'));

  const LEFT_X = 45;
  const RIGHT_X = 310;
  const logoSize = 40;
  const logoY = 50;

  doc.rect(40, 40, 250, 545).stroke();
  doc.rect(305, 40, 250, 545).stroke();

  if (isSaudiAdmin) {
    const logoPath = 'logo.png';
    doc.image(logoPath, LEFT_X + 85, logoY, { width: logoSize });
    doc.image(logoPath, RIGHT_X + 85, logoY, { width: logoSize });

    doc.font('Helvetica-Bold').fontSize(6).fillColor('cornflowerblue')
      .text('SMART FLOCK', LEFT_X + 123, logoY + 10);
    doc.fontSize(6).fillColor('black')
      .text('S A U D I', LEFT_X + 123, logoY + 18);
    doc.font('Helvetica-Bold').fontSize(6).fillColor('cornflowerblue')
      .text('SMART FLOCK', RIGHT_X + 123, logoY + 10);
    doc.fontSize(6).fillColor('black')
      .text('S A U D I', RIGHT_X + 123, logoY + 18);
  }

  // ✅ Increase size of adisLogo.png
  if (!isSaudiAdmin) {
    const headerLogoWidth = 100; // Increased from 35 to 50
    doc.image('adisLogo.png', LEFT_X + 65, logoY + logoSize - 40, { width: headerLogoWidth });
    doc.image('adisLogo.png', RIGHT_X + 65, logoY + logoSize - 40, { width: headerLogoWidth });
  }

  doc.moveTo(LEFT_X + 9, logoY + logoSize + 15).lineTo(LEFT_X + 231, logoY + logoSize + 15).stroke();
  doc.moveTo(RIGHT_X + 9, logoY + logoSize + 15).lineTo(RIGHT_X + 231, logoY + logoSize + 15).stroke();

  const watermarkPath = isSaudiAdmin ? 'watermark.png' : 'adisLogo.png';
  doc.opacity(0.1);
  doc.image(watermarkPath, LEFT_X + 10, 280, { width: isSaudiAdmin ? 180 : 250 });
  doc.image(watermarkPath, RIGHT_X + 10, 280, { width: isSaudiAdmin ? 180 : 250 });
  doc.opacity(1);

  doc.font('Helvetica-Bold').fontSize(13).fillColor('#4B0082')
    .text('REGISTRATION CERTIFICATE', LEFT_X, 110, { align: 'center', width: 250 });
  doc.font('Helvetica-Bold').fontSize(10)
    .text('ADIS Unique Identification of Animal', LEFT_X, 130, { align: 'center', width: 250 });

  doc.moveTo(LEFT_X + 9, 150).lineTo(LEFT_X + 231, 150).stroke();

  const mainImgY = 155;
  doc.save();
  doc.roundedRect(LEFT_X + 40, mainImgY, 170, 100, 8).clip();
  doc.image('goat1.jpg', LEFT_X + 40, mainImgY, { width: 170, height: 100 });
  doc.restore();

  doc.fontSize(14).fillColor('indigo').text(number, LEFT_X, mainImgY + 115, { align: 'center', width: 250 });
  doc.moveTo(LEFT_X + 9, mainImgY + 135).lineTo(LEFT_X + 231, mainImgY + 135).stroke();

  doc.fontSize(9);
  let currentY = mainImgY + 140;

  doc.font('Helvetica-Bold').fillColor('indigo').text('Animal Digital Information System (ADIS)', LEFT_X, currentY, {
    align: 'center',
    width: 250
  });
  currentY += 18;

  const labelX = LEFT_X;
  const colonX = LEFT_X + 65;
  const valueX = LEFT_X + 75;

  doc.text('Owner', labelX, currentY).text(':', colonX, currentY).text('Pradeep Kase', valueX, currentY); currentY += 14;
  doc.text('Mobile', labelX, currentY).text(':', colonX, currentY).text('8746008088', valueX, currentY); currentY += 14;
  doc.text('Address', labelX, currentY).text(':', colonX, currentY).text('mudhol, dis: Belagum', valueX, currentY); currentY += 14;
  doc.text('No. of Owners', labelX, currentY).text(':', colonX, currentY).text('5', valueX, currentY); currentY += 14;

  doc.moveTo(LEFT_X + 9, currentY).lineTo(LEFT_X + 231, currentY).stroke();
  currentY += 8;

  const dataFields = [
    ['Animal Name', 'Goat'],
    ['Breed', 'Assam Hill'],
    ['Ear Tag/RFID', '4'],
    ['Gender', 'Male'],
    ['Species', 'Goat'],
    ['Age', '1 Y, 3 M, 17 D'],
    ['DOB', '12-01-2024'],
    ['Father ID', '5'],
    ['Mother ID', '7']
  ];

  for (let i = 0; i < dataFields.length; i += 2) {
    const [label1, value1] = dataFields[i];
    const [label2, value2] = dataFields[i + 1] || ['', ''];
    doc.text(label1, labelX, currentY).text(':', colonX, currentY).text(value1, valueX, currentY);
    if (label2) {
      doc.text(label2, labelX + 130, currentY).text(':', colonX + 110, currentY).text(value2, valueX + 106, currentY);
    }
    currentY += 14;
  }

  doc.moveTo(LEFT_X + 9, currentY).lineTo(LEFT_X + 231, currentY).stroke();
  currentY += 8;

  const insuranceFields = [
    'Insurance By             : Bajaj allianze general insurance',
    'Insurance Policy No : IC1234567890',
    'Insurance Period      : 01-01-2024 to 01-01-2025 (2 years)',
    'Hypothecation          : Not Applicable not application'
  ];

  insuranceFields.forEach(field => {
    doc.text(field, labelX, currentY);
    currentY += 14;
  });

  doc.image('signature.png', LEFT_X - 1, currentY -8, { width: 58, height: 58 });
  doc.image('qrcode.png', LEFT_X + 190, 520, { width: 44, height: 44 });

  doc.moveTo(LEFT_X + 9, 560).lineTo(LEFT_X + 231, 560).stroke();
  doc.fontSize(8).fillColor('indigo').font('Helvetica-Bold').text('Authenticated By:', LEFT_X + 10, 569);

  doc.save();
  const leftDateX = LEFT_X + 109;
  doc.rotate(-90, { origin: [leftDateX, 20] });
  doc.fontSize(7).fillColor('indigo').text('Registration Date: 01-02-2024', -135, leftDateX - 5);
  doc.text('Download Date: 29-04-2025', -230, leftDateX - 5);
  doc.restore();

  const goatImageWidth = 160;
  const goatImageHeight = 100;
  const imageSpacing = 25.5;
  const panelWidth = 250;
  const goatImageX = RIGHT_X + (panelWidth - goatImageWidth) / 2;
  let yPos = 118;

  const rightImageDates = [
    { reg: '', down: '' },
    { reg: '01-02-2024', down: '29-04-2025' },
    { reg: '', down: '' }
  ];

  ['goat2.jpg', 'goat3.jpg', 'goat4.jpg'].forEach((img, index) => {
    doc.save();
    doc.roundedRect(goatImageX, yPos, goatImageWidth, goatImageHeight, 8).clip();
    doc.image(img, goatImageX, yPos, { width: goatImageWidth, height: goatImageHeight });
    doc.restore();

    if (rightImageDates[index].reg && rightImageDates[index].down) {
      const textX = RIGHT_X + 113;
      const originY = yPos + goatImageHeight / 2;
      doc.save();
      doc.rotate(-90, { origin: [textX, originY] });
      doc.fontSize(7).fillColor('indigo');
      doc.text(`Registration Date: ${rightImageDates[index].reg}`, +405, textX - 5, { lineGap: 1 });
      doc.text(`Download Date: ${rightImageDates[index].down}`, +308, textX - 5, { lineGap: 1 });
      doc.restore();
    }

    yPos += goatImageHeight + imageSpacing;
  });

  yPos -= 6;

  const Disclaimer = `Disclaimer: ADIS TECHNOLOGIES Pvt. Ltd. has taken an initiative to organize the animal care sector in India and create an ecosystem around it. The registration does not make any claims regarding the certification of variety, breed, quality, value, or price of pets. It also does not mandate, monitor, or regulate participation in challenges, prizes, shows, pet events, or activities. ADIS TECHNOLOGIES Pvt. Ltd. understands the challenges involved in building an ecosystem like this, yet takes this initiative with the aim to serve animal owners with the best and need-based services, products, and support.`;

  doc.font('Helvetica-Bold').fillColor('black').fontSize(6).text(Disclaimer, RIGHT_X + 3, yPos, {
    width: 240,
    align: 'justify',
    lineGap: 1
  });

  doc.moveTo(RIGHT_X + 9, 560).lineTo(RIGHT_X + 231, 560).stroke();
  doc.fontSize(10).fillColor('#4B0082').font('Helvetica').text('+91 8762688442', RIGHT_X + 15, 570);
  doc.font('Helvetica-Bold').text('www.adis.co.in', RIGHT_X + 157, 570);

  doc.end();
});
