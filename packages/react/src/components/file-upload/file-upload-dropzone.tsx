import type { DropzoneProps } from "@zag-js/file-upload";
import { mergeProps } from "@zag-js/react";
import { forwardRef } from "react";
import { createSplitProps } from "../../utils/create-split-props";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { useFileUploadContext } from "./use-file-upload-context";

export interface FileUploadDropzoneBaseProps
	extends PolymorphicProps,
		DropzoneProps {}
export interface FileUploadDropzoneProps
	extends HTMLProps<"div">,
		FileUploadDropzoneBaseProps {}

export const FileUploadDropzone = forwardRef<
	HTMLDivElement,
	FileUploadDropzoneProps
>((props, ref) => {
	const [dropzoneProps, localProps] = createSplitProps<DropzoneProps>()(props, [
		"disableClick",
	]);
	const fileUpload = useFileUploadContext();
	const mergedProps = mergeProps(
		fileUpload.getDropzoneProps(dropzoneProps),
		localProps,
	);

	return <ark.div {...mergedProps} ref={ref} />;
});

FileUploadDropzone.displayName = "FileUploadDropzone";
