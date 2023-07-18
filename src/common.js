
export const updateSnackBar = (text,color="error") => {
    var snackbar = {}
    snackbar.value = true;
    snackbar.color = color;
    snackbar.text = text;
    return snackbar;
}