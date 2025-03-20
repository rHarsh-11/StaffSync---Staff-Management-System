import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js"
import departmentRouter from "./routes/department.js"
import employeeRouter from "./routes/employee.js"
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import attendanceRouter from './routes/attendance.js'
import connectToDatabase from "./database/db.js"

connectToDatabase();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
})
