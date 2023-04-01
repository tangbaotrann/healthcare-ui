const editorConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            // 'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'code',
            'codeBlock',
            'findAndReplace',
            'fontColor',
            'fontFamily',
            'fontSize',
            'fontBackgroundColor',
            'highlight',
            'horizontalLine',
            'htmlEmbed',
            // 'imageInsert',
        ],
    },
    language: 'en',
    // image: {
    //     toolbar: [
    //         'imageTextAlternative',
    //         'toggleImageCaption',
    //         'imageStyle:inline',
    //         'imageStyle:block',
    //         'imageStyle:side',
    //     ],
    // },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
};

export default editorConfig;
