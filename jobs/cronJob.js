// jobs/cronJob.js
import cron from "node-cron";
import { sendEmail } from "../service/email.service.js";
import { Todo } from "../model/todo.model.js";
import { User } from "../model/user.model.js";
import { Op } from "sequelize";

const checkTasksForNotification = async () => {
  const oneHourFromNow = new Date(Date.now() + 3600 * 1000);
  const now = new Date();
  console.log(`[Cron Job] Checking tasks for notification at ${now.toISOString()}`);
  try {
    const tasks = await Todo.findAll({
      where: {
        finish_date: {
          [Op.lte]: oneHourFromNow,
          [Op.gte]: now,
        },
      },
      include: [{ model: User }],
    });

    tasks.forEach((task) => {
      const emailSubject = `Reminder: Task "${task.description}" is nearing its end time`;
      const emailText = `Dear ${task.User.firstname},\n\nThis is a reminder that your task "${task.description}" is set to end at ${task.finish_date}.\n\nBest regards,\nYour App`;

      sendEmail(task.User.email, emailSubject, emailText);
    });
  } catch (error) {
    console.error("Failed to check tasks for notifications:", error);
  }
};

// Schedule the job to run every 30 minutes
cron.schedule("*/10 * * * *", checkTasksForNotification);
