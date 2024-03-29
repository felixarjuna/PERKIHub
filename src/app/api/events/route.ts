import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/lib/api/events/mutations";
import { 
  eventIdSchema,
  insertEventParams,
  updateEventParams 
} from "@/lib/db/schema/events";

export async function POST(req: Request) {
  try {
    const validatedData = insertEventParams.parse(await req.json());
    const { success, error } = await createEvent(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/events"); // optional - assumes you will have named route same as entity
    return NextResponse.json(success, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateEventParams.parse(await req.json());
    const validatedParams = eventIdSchema.parse({ id });

    const { success, error } = await updateEvent(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = eventIdSchema.parse({ id });
    const { success, error } = await deleteEvent(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
