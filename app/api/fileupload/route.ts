// import { NextRequest, NextResponse } from "next/server";
// import { PutObjectAclCommand,S3Client } from "@aws-sdk/client-s3";

// const s2 = new S3Client({
//     region:"auto",
//     credentials:{
//         accessKeyId:process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
//         secretAccessKey:process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!
//     },
//     endpoint:process.env.NEXT_PUBLIC_S3_ENDPOINT_URL!
// })

// export const POST = async (req: NextRequest) => {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;
//   // const fileName = formData.get("fileName") as string;
//   // const fileType = formData.get("fileType") as string;
//   return NextResponse.json({ message: "File upload route works!" });
// };
