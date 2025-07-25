// import Navbar from "./../components/Navbar";
// import HomeCSV from "./../app/home/page";
import { Toaster } from "react-hot-toast";
// import "./globals.css";

export const metadata = {
  title: "orders",
  description: "orders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <div className="dark:text-white h-[calc(100vh-5rem)] p-10">
          <div className="container mx-auto h-full">{children}</div>
        </div>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
