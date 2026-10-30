import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        budgetItems: true,
        timelineItems: true,
        vendors: true,
        creativeIdeas: true,
      },
    });
    return NextResponse.json({ events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

