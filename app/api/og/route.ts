// import { ImageResponse } from "next/og";
// import { NextRequest } from "next/server";

// // Runs on Vercel's Edge Network — faster, closer to users
// export const runtime = "edge";

// export async function GET(request: NextRequest) {
//     const { searchParams } = new URL(request.url);

//     const title = searchParams.get("title") ?? "Your Name";
//     const subtitle = searchParams.get("subtitle") ?? "Frontend Developer";
//     const type = searchParams.get("type") ?? "default"; // "post" | "project" | "default"

//     return new ImageResponse(
//         (
//             <div
//         style= {{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         justifyContent: "space-between",
//         backgroundColor: "#09090b",
//         padding: "80px",
//     }}
//       >
//     {/* Top: type badge */ }
//     < div
// style = {{
//     display: "flex",
//         alignItems: "center",
//             gap: "10px",
//           }}
//         >
//     <div
//             style={
//     {
//         width: "10px",
//             height: "10px",
//                 borderRadius: "50%",
//                     backgroundColor: "#10b981",
//             }
// }
//           />
//     < span
// style = {{
//     fontFamily: "monospace",
//         fontSize: "18px",
//             color: "#52525b",
//                 textTransform: "uppercase",
//                     letterSpacing: "0.15em",
//             }}
//           >
//     { type === "post"
//     ? "// blog post"
//     : type === "project"
//         ? "// project"
//         : "// yourname.dev"}
// </span>
//     </div>

// {/* Middle: title */ }
// <div style={ { display: "flex", flexDirection: "column", gap: "20px" } }>
//     <h1
//             style={
//     {
//         fontSize: title.length > 40 ? "52px" : "64px",
//             fontWeight: "700",
//                 color: "#f4f4f5",
//                     lineHeight: "1.1",
//                         margin: "0",
//                             maxWidth: "900px",
//             }
// }
//           >
//     { title }
//     </h1>
// {
//     subtitle && (
//         <p
//               style={
//         {
//             fontSize: "24px",
//                 color: "#71717a",
//                     margin: "0",
//                         fontFamily: "monospace",
//               }
//     }
//             >
//         { subtitle }
//         </p>
//           )
// }
// </div>

// {/* Bottom: site identity */ }
// <div
//           style={
//     {
//         display: "flex",
//             alignItems: "center",
//                 justifyContent: "space-between",
//                     width: "100%",
//           }
// }
//         >
//     <span
//             style={
//     {
//         fontFamily: "monospace",
//             fontSize: "20px",
//                 color: "#10b981",
//                     fontWeight: "600",
//             }
// }
//           >
//     ~/yourname
//     </span>
//     < span
// style = {{
//     fontFamily: "monospace",
//         fontSize: "16px",
//             color: "#3f3f46",
//             }}
//           >
//     yourname.dev
//     </span>
//     </div>
//     </div>
//     ),
// {
//     width: 1200,
//         height: 630,
//     }
//   );
// }