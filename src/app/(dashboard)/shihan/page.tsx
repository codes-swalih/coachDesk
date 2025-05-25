import { Landmark } from 'lucide-react';
import React from 'react';

function page() {
  return (
    <div className=" w-full h-auto flex flex-col gap-10">
      <div className=" flex flex-col gap-5">
        <h1 className=" text-4xl font-semibold">Dashboard Overview</h1>
        <hr />
        <div className="flex flex-1 flex-col gap-4 ">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video p-10 rounded-md bg-muted flex flex-col gap-5">
              <Landmark size={50} />
              <hr className=" w-full border-gray-400" />
              <h1 className=" text-3xl font-semibold">Total Classes</h1>
              <h1 className="text-5xl text-gray-300 font-semibold">21</h1>
            </div>
            <div className="aspect-video p-10 rounded-md bg-muted flex flex-col gap-5">
              <Landmark size={50} />
              <hr className=" w-full border-gray-400" />
              <h1 className=" text-3xl font-semibold">Total Students</h1>
              <h1 className="text-5xl text-gray-300 font-semibold">21</h1>
            </div>
            <div className="aspect-video p-10 rounded-md bg-muted flex flex-col gap-5">
              <Landmark size={50} />
              <hr className=" w-full border-gray-400" />
              <h1 className=" text-3xl font-semibold">Active Sensai</h1>
              <h1 className="text-5xl text-gray-300 font-semibold">21</h1>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </div>
    </div>
  );
}

export default page;
