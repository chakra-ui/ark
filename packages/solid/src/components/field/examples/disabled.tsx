import { Field } from "@ark-ui/solid/field";

export const Disabled = () => {
	return (
		<Field.Root disabled>
			<Field.Label>Label</Field.Label>
			<Field.Input />
			<Field.HelperText>Some additional Info</Field.HelperText>
			<Field.ErrorText>Error Info</Field.ErrorText>
		</Field.Root>
	);
};
