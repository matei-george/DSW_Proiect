"use server";

import dbConnect from "../../../lib/mongodb";
import Review from "../../../models/Review";
import CampGround from "../../../models/CampGround";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { revalidatePath } from "next/cache";

export async function createReview(campgroundId, reviewData) {
   const session = await getServerSession(authOptions);
   if (!session) throw new Error("Trebuie să fii logat!");

   await dbConnect();

   const review = await Review.create({
      body: reviewData.body,
      rating: Number(reviewData.rating),
      author: session.user.id,
      campground: campgroundId,
   });

   await CampGround.findByIdAndUpdate(campgroundId, {
      $push: { reviews: review._id },
   });

   revalidatePath(`/campgrounds/${campgroundId}`);
   return { success: true };
}
