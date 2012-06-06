// Application Port
process.env['PORT'] = 3030;

// MongoDB Configuration
process.env['MONGODB_HOST'] = 'staff.mongohq.com';
process.env["MONGODB_PORT"] = 10087;
process.env['MONGODB_DATABASE'] = 'TropoAPITest';
process.env["MONGODB_USER"] = 'testuser';
process.env["MONGODB_PASSWORD"] = 'testpassword';

// Tropo Tokens
process.env["TROPO_CALL_TOKEN"] = '11bc7291593c6a408b6ca416ff478f269056f8bd7d4656633a9b289f0426d22bcf72ae2edfb3fb71dd673e10';
process.env["TROPO_MESSAGE_TOKEN"] = '11bc2ebce55e1142a9198cfc82c25475b653b08315c3a907eb3df8bf795be9cf4a25d4312290c409000555de';