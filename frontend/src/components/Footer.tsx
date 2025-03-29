const Footer = () => {
    return (
        <div className="bg-blue-800 py-6">
            <div className="max-w-7xl px-4 mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                {/* Brand Name */}
                <span className="text-3xl text-white font-bold">
                    MernHolidays.com
                </span>

                {/* Links Section */}
                <div className="text-white font-medium flex gap-6 mt-4 sm:mt-0">
                    <p className="cursor-pointer hover:underline">Privacy Policy</p>
                    <p className="cursor-pointer hover:underline">Terms of Service</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
