import nodemailer from "nodemailer";

/**
 * Configure
 * @description Configure nodemailer sender details
 * @returns {Object} mailTransporter
 */
const Configure = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
};

/**
 * Send Mail
 * @param {Object} mailTransporter
 * @param {Object} details
 */
const sendMail = (mailTransporter, details) => {
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log({ err });
    } else {
      console.log("email has sent");
    }
  });
};

const mailBody = {
  welcome: ({ name, email, password }) => `Dear ${name},
  
        On behalf of Mavens, I would like to welcome you to the team! We are so excited to have you join us and look forward to all that you will contribute.
                    
        We are looking forward to getting to know you and helping you succeed in your new role.
        
        username : ${email}
        password : ${password}
        
        Welcome to the team!
        
        Sincerely,
        HR`,
  salaryInc: ({ name, salary }) => `Dear ${name},

        I am writing to congratulate you on your recent salary increment up to ${salary}. 

        This is a well-deserved recognition of your hard work and dedication to our company.`,
  addBonus: ({ name, bonus }) => `Dear ${name},

        I am writing to congratulate you on your recent bonus add up to ${bonus}. 
        
        This is a well-deserved recognition of your hard work and dedication to our company.`,
};

const subject = {
  welcome: "Welcome to the team!",
  salaryInc: "Congratulations on your salary increment!",
  addBonus: "Add Bonus",
};

/**
 * Generate verification email
 * @description - This function send otp to users for verifying their email is valid or not
 * @param {string} email
 * @param {string} otp
 */
export const GenerateMail = ({
  email,
  name,
  password,
  salary,
  bonus,
  topic,
}) => {
  const mailTransporter = Configure();
  const details = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: subject[topic],
    text: mailBody[topic]({ name, email, password, salary, bonus }),
  };
  sendMail(mailTransporter, details);
};
