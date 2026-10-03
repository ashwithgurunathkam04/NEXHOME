import fs from 'fs'
import path from 'path'

const outputDirectory = path.join(
    process.cwd(),
    'public',
    'products',
    'laundry',
)

const productImages = {
    41: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lg/492664431/0/gtDz72wPQE-qIXsAjsD7N-LG-FHM1207SDL-Washing-Machine-492664431-i-1-1200Wx1200H.jpeg',

    42: 'https://backend.paiinternational.in/media/images/1_w1847dM.jpg',

    43: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/zCIomxNTO8-bosch-9-kg-front-load-washing-machine-white-494351631-i-1-1200wx1200h.jpeg',

    44: 'https://cdn.qrs.in/qrs-e-commerce-store/1711/portfolio.jpg?biz=1&height=200&meta=true',

    45: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/whirlpool/493666493/0/jY0e5TFw3g-DRVAsfjHzhi-Whirlpool-Bloomwash-Pro-Fully-Automatic-Top-Load-493666493-i-1-1200Wx1200H.jpeg',

    46: 'https://static1.industrybuying.com/products/furniture-hospitality-and-food-service/laundry-machine-and-appliances/washing-machine/FUR.WAS.741965736_1777264440791.webp',

    47: 'https://m.media-amazon.com/images/I/71iQeLMFtgL._SL1500_.jpg',

    48: 'https://img-prd-pim.poorvika.com/product/godrej-7-0kg-fully-automatic-front-load-washing-machine-wfeon-arg-7014-febdt-silver-stream-front-opened.png',

    49: 'https://aaravelectronics.com/cdn/shop/files/FHB1208Z4P.jpg?v=1780210375',

    50: 'https://rukminim2.flixcart.com/image/480/640/xif0q/washing-machine-new/k/8/k/-original-imahn7z24gmm4zaz.jpeg?q=90',

    51: 'https://img-prd-pim.poorvika.com/cdn-cgi/image/width%3D500%2Cheight%3D500%2Cquality%3D75/product/bosch-10-0kg-fully-automatic-front-load-washing-machine-wga254axin-silver-specs-02.png',

    52: 'https://backend.paiinternational.in/media/images/6_W2vVYpN.jpg',

    53: 'https://static.toiimg.com/thumb/resizemode-4%2Cmsid-124157650%2Cwidth-1070/124157650.jpg',

    54: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/ifb/494510257/6/LsyQPXI3zy-jafJDq-Wi2-IFB-Executive-Oxn-WMachine-494510257-i-7-1200Wx1200H.jpeg',

    55: 'https://www.machineyantra.com/uploads/media/2023/A403.jpg',

    56: 'https://electronicparadise.in/cdn/shop/files/12_2f61e752-7bb6-4561-b892-6a5e1a085f2b.jpg?v=1764059212&width=1214',

    57: 'https://darlingretail.com/cdn/shop/files/1_73b9b129-c517-4dcf-a4f7-aaf43961bd14.jpg?v=1755761661',

    58: 'https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/305035_0_gsee8z.png',

    59: 'https://vasanthandco.in/images/productimages/1984__product__Washing%20Machine__lloyd-tl-wm-glwmt70gcgja-7-kg-4.png',

    60: 'https://www.ifbappliances.com/media/catalog/product/s/e/senator_plus_vxs_fv_1.png',
}

const minimumImageSize = 5000

const getExtensionFromContentType = (contentType) => {
    const normalizedType = contentType
        ?.split(';')[0]
        ?.trim()
        ?.toLowerCase()

    const extensionMap = {
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp',
        'image/avif': '.avif',
    }

    return extensionMap[normalizedType] || '.jpg'
}

const downloadImage = async (id, url) => {
    const response = await fetch(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140 Safari/537.36',

            Accept:
                'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
    })

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status} ${response.statusText}`,
        )
    }

    const contentType =
        response.headers.get('content-type') || ''

    if (!contentType
        .toLowerCase()
        .startsWith('image/')) {
        throw new Error(
            `URL did not return an image (${contentType || 'unknown content type'})`,
        )
    }

    const buffer = Buffer.from(
        await response.arrayBuffer(),
    )

    if (buffer.length < minimumImageSize) {
        throw new Error(
            `Image is too small (${buffer.length} bytes)`,
        )
    }

    const extension =
        getExtensionFromContentType(contentType)

    const outputPath = path.join(
        outputDirectory,
        `${id}${extension}`,
    )

    fs.writeFileSync(outputPath, buffer)

    return {
        outputPath,
        size: buffer.length,
    }
}

const main = async () => {
    fs.mkdirSync(outputDirectory, {
        recursive: true,
    })

    let downloaded = 0
    let failed = 0

    const entries = Object.entries(productImages)

    for (const [id, url] of entries) {
        console.log(
            `[${Number(id) - 40}/20] Downloading laundry product ${id}...`,
        )

        try {
            const result = await downloadImage(
                id,
                url,
            )

            console.log(`  ✓ ${result.outputPath}`)

            console.log(
                `  ✓ ${(result.size / 1024).toFixed(1)} KB`,
            )

            downloaded += 1
        } catch (error) {
            console.error(
                `  ✗ FAILED: ${error.message}`,
            )

            failed += 1
        }
    }

    console.log('')

    console.log(
        '================================================',
    )

    console.log('COMPLETE')
    console.log(`Downloaded: ${downloaded}`)
    console.log(`Failed:     ${failed}`)

    console.log(
        '================================================',
    )

    if (failed > 0) {
        process.exit(1)
    }
}

main()