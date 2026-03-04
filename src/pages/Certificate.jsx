import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Certificate() {
  const certificateRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from Results page
  const { name, subject, percentage, date } = location.state || {};

  // If someone directly visits /certificate without data
  if (!location.state) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            No Certificate Data Found
          </h2>
          <button
            onClick={() => navigate("/results")}
            className="px-6 py-2 bg-primary text-background-dark rounded-full font-bold"
          >
            Go Back to Results
          </button>
        </div>
      </>
    );
  }

  const handleDownload = async () => {
    const element = certificateRef.current;

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name}_Certificate.pdf`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">

        {/* Certificate Container */}
        <div
          ref={certificateRef}
          className="bg-white w-full max-w-6xl px-24 py-20 rounded-3xl shadow-2xl border-[8px] border-purple-600 relative"
        >

          {/* Decorative Corners */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-purple-400"></div>
          <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-purple-400"></div>
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-purple-400"></div>
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-purple-400"></div>

          {/* Header */}
          <div className="text-center">
            <p className="uppercase tracking-[5px] text-gray-400 text-sm">
              Official Certification
            </p>

            <h1 className="text-5xl font-extrabold text-gray-800 mt-4 tracking-wide">
              Certificate of Achievement
            </h1>

            <div className="w-64 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded"></div>
          </div>

          {/* Name Section */}
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg">
              This is to proudly certify that
            </p>

            <h2 className="text-4xl font-bold text-purple-700 mt-6 tracking-wide">
              {name}
            </h2>

            <div className="w-72 h-[2px] bg-purple-400 mx-auto mt-4"></div>
          </div>

          {/* Description */}
          <div className="text-center mt-14 px-20">
            <p className="text-gray-700 text-lg leading-relaxed">
              has successfully completed the{" "}
              <span className="font-semibold text-gray-900">
                {subject}
              </span>{" "}
              assessment and demonstrated exceptional knowledge,
              analytical thinking, and dedication throughout the evaluation.
            </p>

            <p className="text-gray-700 text-lg mt-10">
              Achieving an outstanding overall score of
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-4">
              {percentage}
            </h3>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end mt-24">

            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide">
                Date of Issue
              </p>
              <p className="font-semibold text-gray-700 mt-1">
                {date}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400 uppercase tracking-wide">
                Authorized By
              </p>
              <p className="text-purple-700 font-bold text-lg mt-1">
                Quiz Portal Examination Board
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8 mb-10 bg-background-dark">
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transform transition duration-300 text-white px-12 py-4 rounded-xl shadow-xl text-lg font-semibold"
        >
          Download Certificate
        </button>
      </div>
    </>
  );
}
