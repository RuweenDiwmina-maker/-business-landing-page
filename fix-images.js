const fs = require('fs');

const shapesPath = 'C:\\Users\\Ruveen\\.gemini\\antigravity\\brain\\074f0486-d2c0-4bb6-9b8d-a88fd448d1f4\\abstract_3d_shapes_1784768172953.jpg';
const dashboardPath = 'C:\\Users\\Ruveen\\.gemini\\antigravity\\brain\\074f0486-d2c0-4bb6-9b8d-a88fd448d1f4\\premium_dashboard_ui_1784768162907.jpg';

const shapesBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(shapesPath).toString('base64');
const dashboardBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(dashboardPath).toString('base64');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/file:\/\/\/[^"]+abstract_3d_shapes_1784768172953\.jpg/g, shapesBase64);
indexHtml = indexHtml.replace(/file:\/\/\/[^"]+premium_dashboard_ui_1784768162907\.jpg/g, dashboardBase64);
fs.writeFileSync('index.html', indexHtml);

let aboutHtml = fs.readFileSync('about.html', 'utf8');
aboutHtml = aboutHtml.replace(/file:\/\/\/[^"]+abstract_3d_shapes_1784768172953\.jpg/g, shapesBase64);
fs.writeFileSync('about.html', aboutHtml);

console.log("Success");
