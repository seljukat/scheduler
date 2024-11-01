## Scheduler

A basic scheduler application that organizes your timetable by generating alternative schedules based on your course selections.

> [!NOTE]
> The data in your .xls or .xlsx file should have the following properties and their values in below format for the app to generate schedules (if not, you can adjust the code according to your needs to make the app work with your data):
> ```
>      {
>            .
>            .
>            .
>            Code: "MATH 101",
>            Section: "MATH 101_01",
>            Lecturer: "John Doe",
>            Room: "A123",
>            Schedule: "Mo 09 - 10 We 13 - 15 Fr 09 - 12 Fr 16 - 19",
>            .
>            .
>            .
>      }
> ```

### 🚩 [View Live Demo](https://courscheduler.netlify.app/)

### 📝 Usage

- upload a `.xls` or `.xlsx` file
- add or remove courses to/from your selected courses and click `apply` 
- navigate between `alternative schedules` using the pagination above the displayed schedule to pick the one that fits your needs
- jump directly to a specific schedule using the `go to:` input (top-right corner of the displayed schedule) 
- click on the `camera icon` (top-left corner of the displayed schedule) to download the screenshot of your schedule

### 🏃‍♂️ Running in local development mode

```bash
cd scheduler
npm install
npm run dev
```

open http://localhost:5173 with your browser to see the result.

>you can use the sample data in the root directory to check out the features of the application

### 🚩 Live Demo

Current version running at: [https://courscheduler.netlify.app/](https://courscheduler.netlify.app/)

### 📷 Screenshots

`APP:`
![scheduler](https://github.com/user-attachments/assets/cea78181-7246-4a91-beed-9dee953fbf64)

`SELECTING COURSES AFTER UPLOADING YOUR FILE:`
![select-courses](https://github.com/user-attachments/assets/3c56e6db-b6d0-4a42-bf3b-245a026e1e98)

`APPLYING SELECTIONS:`
![click-apply](https://github.com/user-attachments/assets/90d5ff9b-7bf5-47a7-92dd-97ddd986b4cb)

`GENERATED SCHEDULES:`
![schedules](https://github.com/user-attachments/assets/96e587ff-cfe0-49f6-b730-7c96b28d4fa0)

`CHANGING SELECTED SCHEDULES:`
![change-selected-courses](https://github.com/user-attachments/assets/ef8fcc9d-3be1-4b30-8f41-58fc71b4c7f8)

`JUMPING DIRECTLY TO A SPECIFIC SCHEDULE:`
![go-to](https://github.com/user-attachments/assets/0f3c414c-3807-4ca1-8afc-7788b8868e80)

`DOWNLOADING A SCHEDULE:`
![download-schedule](https://github.com/user-attachments/assets/4dcb53e5-12fc-404b-a06a-7b7e5f9477e2)
