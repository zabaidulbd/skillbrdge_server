// import { prisma } from "../lib/prisma";
// import { UserRole } from "../middleware/auth";

// async function seedAdmin() {
//   try {
//     const adminData = {
//       name: "Admin User1",
//       email: "admin1@admin.com",
//       role: UserRole.ADMIN,
//       password: "admin1234",
//     };
//     // check user already exists or not
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email: adminData.email,
//       },
//     });

//     if (existingUser) {
//       throw new Error("User info already exists!!");
//     }

//     const signUpAdmin = await fetch(
//       "http://localhost:3000/api/auth/sign-up/email",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(adminData),
//       },
//     );

//     if (signUpAdmin.ok) {
//       await prisma.user.update({
//         where: {
//           email: adminData.email,
//         },
//         data: {
//           emailVerified: true,
//         },
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// seedAdmin();

import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Admin User1",
      email: "admin1@admin.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      console.log("Admin user already exists!!");
      return;
    }

    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      },
    );

    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },

        data: {
          role: UserRole.ADMIN,
          status: "ACTIVE",
        },
      });
      console.log("Admin user seeded successfully!");
    } else {
      const errorResponse = await signUpAdmin.json();
      console.error("Failed to seed admin:", errorResponse);
    }
  } catch (error) {
    console.error("An error occurred during seeding:", error);
  }
}

seedAdmin();
