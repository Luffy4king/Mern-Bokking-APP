const Footer = () => {
  return (
    <footer className="bg-blue-700 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
     
        <span className="text-2xl text-white font-bold tracking-tight">
          Holidays.com
        </span>

     
        <div className="text-white font-medium mt-4 md:mt-0 flex gap-6">
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms and Services</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
