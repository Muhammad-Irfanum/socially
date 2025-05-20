import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // Get the userId from Clerk
      const { userId } = await auth();
      
      // If user is not authenticated, throw error
      if (!userId) throw new UploadThingError("Unauthorized");

      // Return the userId as metadata
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url); // Note: Correct property is file.url

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;