export const Password_Template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify OTP Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #007BFF;
      padding: 10px 0;
      color: white;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .otp {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      color: #007BFF;
      background-color: #f9f9f9;
      padding: 10px 20px;
      border-radius: 5px;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h2>OTP Verification</h2>
    </div>
    <div class="content">
      <p>Dear {{email}},</p>
      <p>Your One-Time Password (OTP) for verification is:</p>
      <div class="otp">{{otp}}</div>
      <p>Please enter this OTP to complete your verification process. If you did not request this, please ignore this email.</p>
      <p>Thank you,<br>The Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
