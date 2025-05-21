# Anushka
# Anushka
I have implemented the page using the node js.
For that I have used pdfkit.

const doc = new PDFDocument({ size: 'A4', margin: 20 });
doc.pipe(fs.createWriteStream('animal_certificate.pdf'));
//Creates a new A4-sized PDF document and prepares it for writing output to the file system.

doc.rect(40, 40, 250, 545).stroke();
doc.rect(305, 40, 250, 545).stroke();
//Draws two bordered rectangles to represent the left and right panels of the certificate.

if (isSaudiAdmin) {
  // Uses 'logo.png' with "SMART FLOCK" and "SAUDI" branding
} else {
  // Uses 'adisLogo.png' branding, centered above the horizontal line
}
Dynamically changes the logo based on whether the certificate is issued by a Saudi admin.

doc.opacity(0.1);
doc.image(watermarkPath, LEFT_X + 10, 280, { width: 250 });
doc.opacity(1);
//Fades and overlays a watermark image (logo or branding) in the center of each panel.

doc.roundedRect(...).clip();
doc.image('goat1.jpg', ...);
//Places the first animal image inside a rounded rectangle on the left panel.

doc.fontSize(14).fillColor('indigo').text(number, ...);
doc.font('Helvetica-Bold').fontSize(13).text('REGISTRATION CERTIFICATE', ...);
//Adds the main heading, animal ID number, and section titles.

doc.font('Helvetica-Bold').fillColor('black').fontSize(6).text(Disclaimer, ...);
//Adds a disclaimer clarifying that the certificate does not verify breed or pricing—it's for informational purposes only.











