# پروژه‌ی React

این پروژه با استفاده از کتابخانه‌ی React پیاده‌سازی شده است.

## ✍️ توضیح کلی پروژه

در این پروژه، کاربر می‌تواند از طریق ابزارهای مختلف روی بوم (Canvas) تغییراتی اعمال کرده و اطلاعات مربوط به آن را در پنل‌های کناری مشاهده کند. این سیستم به‌صورت ماژولار طراحی شده و از کامپوننت‌های مستقل استفاده می‌کند تا قابلیت توسعه و نگهداری آسان‌تری داشته باشد. پیاده‌سازی به گونه‌ای انجام شده که از معماری component-based استفاده شود. برای هر بخش از رابط کاربری یک کامپوننت جداگانه تعریف شده است. ارتباط بین این کامپوننت‌ها از طریق props و state مدیریت می‌شود.



## 🧩 کامپوننت‌ها

- `Header`: .این بخش شامل عنوان نقاشی و دکمه های ایمپورت و اکسپورت برای دریافت و بارگزاری نقاشی داخل بوم است
 <img width="1482" height="579" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/db5a60cd-00af-479d-afa3-596890d2c7f4" />
 
- `Canvas`: .بوم یا فضای کاری اصلی که کاربر روی آن عملیات انجام می‌دهد
 <img width="640" height="894" alt="Screenshot (122)" src="https://github.com/user-attachments/assets/fef55278-dcbd-4308-9341-f99f4760d80c" />
 
- `InfoPanel`: .نمایش اطلاعات مربوط به وضعیت فعلی بوم و تعداد آیتم های انتخاب‌شده
<img width="1088" height="427" alt="Screenshot (121)" src="https://github.com/user-attachments/assets/b3dff9b3-a759-4198-a3ee-0dbc218fd513" />

- `ToolsPanel`: .شکل های قابل استفاده برای تعامل با بوم
<img width="1248" height="396" alt="Screenshot (120)" src="https://github.com/user-attachments/assets/c49f4c22-7a6e-44a4-8379-72895514eb40" />

## ⚙️ برنامه
- `هدر`:
<img width="1920" height="231" alt="Screenshot (123)" src="https://github.com/user-attachments/assets/1083783b-7e91-4dc5-afd9-a58f50fc0292" />

می توان نام نقاشی داخل کادر نوشت. برای ایمپورت و اکسپورت نیز دکمه قرار داده شده است.

- `پنل ابزار`:
<img width="501" height="668" alt="Screenshot (125)" src="https://github.com/user-attachments/assets/e3ef70f1-b741-4884-9181-65d85f64b3b9" />

برای درج شکل از این بخش به صورت drag and drop شکل به بوم اضافه می شود. برای حذف شکل نیز کافی است 2 بار روی شکل مورد نظر کلیک شود.

- `پنل اطلاعات`:
<img width="1920" height="324" alt="Screenshot (124)" src="https://github.com/user-attachments/assets/03e948f4-5c86-4fbb-b224-c05d9b4cf465" />
در این بخش تعداد هر شکل نوشته شده است.

- `نمونه خروجی`:

<img width="1445" height="768" alt="Screenshot (126)" src="https://github.com/user-attachments/assets/261fb9ee-9149-4c66-b7f6-bd3194963b70" />

## 🚀 اجرا

برای اجرای پروژه، مراحل زیر را انجام دهید:



```bash
git clone https://github.com/Mamadf/Web-HW2.git
cd Web-HW2
npm install //if it's not installed
npm start
