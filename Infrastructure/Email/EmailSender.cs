using System.Threading.Tasks;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
// using SendGrid;
// using SendGrid.Helpers.Mail;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public bool SendEmailAsync(string userEmail, string emailSubject, string msg)
        {
            // var client = new SendGridClient("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");
            // var message = new SendGridMessage
            // {
            //     From = new EmailAddress("filip.soljic@gmial.com", "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"),
            //     Subject = emailSubject,
            //     PlainTextContent = msg,
            //     HtmlContent = msg
            // };
            // message.AddTo(new EmailAddress(userEmail));
            // message.SetClickTracking(false, false);

            // await client.SendEmailAsync(message);

             string fromMail = "filip.soljic@gmail.com";
            string fromPassword = "apkqwmczuxgtjled";
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("test@localhost");
            mailMessage.To.Add(new MailAddress(userEmail));

            mailMessage.Subject = emailSubject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = msg;

            SmtpClient client = new SmtpClient();
            client.Credentials = new System.Net.NetworkCredential(fromMail, fromPassword);
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            //SmtpClient client = new SmtpClient();
            //client.DeliveryMethod = SmtpDeliveryMethod.
            // SpecifiedPickupDirectory;
            //client.PickupDirectoryLocation = @"C:\Test";


            //client.Send("test@localhost", userEmail,
            //       "Confirm your email",
            //   confirmationLink);

            try
            {
                client.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);// log exception
            }
            return false;
        }
        }
    }
