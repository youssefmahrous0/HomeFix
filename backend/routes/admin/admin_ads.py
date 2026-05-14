from flask import Blueprint, jsonify, request
from models.advertisement import Advertisement
from extensions import db
from datetime import datetime

admin_ads = Blueprint(
    "admin_ads",
    __name__
)

# =========================================
# GET ALL ADS
# =========================================

@admin_ads.route(
    "/admin/ads",
    methods=["GET"]
)
def get_ads():

    ads = Advertisement.query.order_by(
        Advertisement.id.desc()
    ).all()

    ads_list = []

    total_views = 0
    total_clicks = 0

    active_ads = 0

    for ad in ads:

        total_views += ad.views or 0
        total_clicks += ad.clicks or 0

        if ad.status == "نشط":
            active_ads += 1

        ads_list.append({

            "id": ad.id,

            "title": ad.title,

            "description":
                ad.description,

            "location":
                ad.location,

            "image":
                ad.image,

            "status":
                ad.status,

            "ad_type":
                ad.ad_type,

            "views":
                ad.views,

            "clicks":
                ad.clicks,

            "ctr":
                ad.ctr,

            "start_date":
                ad.start_date.strftime("%Y-%m-%d")
                if ad.start_date else None,

            "end_date":
                ad.end_date.strftime("%Y-%m-%d")
                if ad.end_date else None,

        })

    return jsonify({

        "ads": ads_list,

        "total_ads":
            len(ads),

        "active_ads":
            active_ads,

        "total_views":
            total_views,

        "total_clicks":
            total_clicks

    })


# =========================================
# CREATE AD
# =========================================

@admin_ads.route(
    "/admin/ads",
    methods=["POST"]
)
def create_ad():

    data = request.json

    ad = Advertisement(

        title=data.get("title"),

        description=data.get(
            "description"
        ),

        location=data.get(
            "location"
        ),

        image=data.get(
            "image"
        ),

        status=data.get(
            "status",
            "نشط"
        ),

        ad_type=data.get(
            "ad_type",
            "بانر"
        ),

        views=data.get(
            "views",
            0
        ),

        clicks=data.get(
            "clicks",
            0
        ),

        ctr=data.get(
            "ctr",
            0
        ),

        start_date=datetime.strptime(
            data.get("start_date"),
            "%Y-%m-%d"
        ) if data.get("start_date")
        else None,

        end_date=datetime.strptime(
            data.get("end_date"),
            "%Y-%m-%d"
        ) if data.get("end_date")
        else None,

    )

    db.session.add(ad)
    db.session.commit()

    return jsonify({
        "message":
            "تم إنشاء الإعلان"
    })


# =========================================
# DELETE AD
# =========================================

@admin_ads.route(
    "/admin/ads/<int:id>",
    methods=["DELETE"]
)
def delete_ad(id):

    ad = Advertisement.query.get(id)

    if not ad:

        return jsonify({
            "message":
                "الإعلان غير موجود"
        }), 404

    db.session.delete(ad)
    db.session.commit()

    return jsonify({
        "message":
            "تم حذف الإعلان"
    })


# =========================================
# UPDATE STATUS
# =========================================

@admin_ads.route(
    "/admin/ads/<int:id>/status",
    methods=["PUT"]
)
def update_ad_status(id):

    ad = Advertisement.query.get(id)

    if not ad:

        return jsonify({
            "message":
                "الإعلان غير موجود"
        }), 404

    data = request.json

    ad.status = data.get(
        "status"
    )

    db.session.commit()

    return jsonify({
        "message":
            "تم تحديث الحالة"
    })
    

# =========================================
# UPDATE AD
# =========================================

@admin_ads.route(
    "/admin/ads/<int:id>",
    methods=["PUT"]
)
def update_ad(id):

    ad = Advertisement.query.get(id)

    if not ad:

        return jsonify({
            "message":
                "الإعلان غير موجود"
        }), 404

    data = request.json

    ad.title = data.get(
        "title",
        ad.title
    )

    ad.description = data.get(
        "description",
        ad.description
    )

    ad.location = data.get(
        "location",
        ad.location
    )

    ad.image = data.get(
        "image",
        ad.image
    )

    ad.status = data.get(
        "status",
        ad.status
    )

    ad.ad_type = data.get(
        "ad_type",
        ad.ad_type
    )

    ad.views = data.get(
        "views",
        ad.views
    )

    ad.clicks = data.get(
        "clicks",
        ad.clicks
    )

    # تحديث CTR تلقائي
    if ad.views and ad.views > 0:

        ad.ctr = round(
            (ad.clicks / ad.views) * 100,
            2
        )

    ad.start_date = datetime.strptime(
        data.get("start_date"),
        "%Y-%m-%d"
    ) if data.get("start_date") else ad.start_date

    ad.end_date = datetime.strptime(
        data.get("end_date"),
        "%Y-%m-%d"
    ) if data.get("end_date") else ad.end_date

    db.session.commit()

    return jsonify({

        "message":
            "تم تعديل الإعلان"

    })