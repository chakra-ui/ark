import type { NextRequest } from "next/server";
import { types } from ".velite";

type Params = Promise<{ framework: string }>;

export const GET = async (_: NextRequest, segmentData: { params: Params }) => {
	const { framework } = await segmentData.params;
	const components = types
		.filter((type) => type.framework === framework)
		.map((x) => x.component);

	if (!components) {
		return Response.json({ error: "Not found" }, { status: 404 });
	}
	return Response.json(components);
};
