import { Link } from 'react-router-dom';
import styles from './CustomPack.module.css';

export default function CustomPack() {
  return (
    <section className={styles.section} aria-labelledby="packages-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Pricing
          </span>
          <h2 id="packages-title" className={styles.title}>Driver Packages</h2>
        </header>

        <div className={styles.grid}>
          {/* ─── LOCAL TARIFF ─── */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeading}>
                <h3 className={styles.badge}>Local Tariff</h3>
                <p className={styles.cardTag}>City travel</p>
              </div>
            </div>

            <div className={styles.priceBlock}>
              <p className={styles.price}>₹600</p>
              <p className={styles.pricePill}>4 Hours</p>
            </div>

            <ul className={styles.list}>
              <li className={styles.row}>
                <span className={styles.rowLabel}>Additional Hour</span>
                <span className={styles.rowValue}>₹100</span>
              </li>
            </ul>

            <h4 className={styles.groupLabel}>Applicable Charges</h4>
            <ul className={styles.list}>
              <li className={styles.row}>
                <span className={styles.rowBody}>
                  <span className={styles.rowLabel}>Night Charge</span>
                  <span className={styles.rowMeta}>After 10:15 PM</span>
                </span>
                <span className={styles.rowValue}>₹100</span>
              </li>
              <li className={styles.row}>
                <span className={styles.rowBody}>
                  <span className={styles.rowLabel}>Early Morning Charge</span>
                  <span className={styles.rowMeta}>Before 5:30 AM</span>
                </span>
                <span className={styles.rowValue}>₹100</span>
              </li>
            </ul>

            <p className={styles.note}>
              Night and early-morning charges are additional and applied on top of the package.
            </p>

            <div className={styles.cardFooter}>
              <Link to="/booking-form" className={`btn btn-primary ${styles.cardBtn}`}>
                Book a driver
              </Link>
            </div>
          </article>

          {/* ─── OUTSTATION TARIFF ─── */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeading}>
                <h3 className={styles.badge}>Outstation Tariff</h3>
                <p className={styles.cardTag}>Same-day return</p>
              </div>
            </div>

            <div className={styles.priceBlock}>
              <p className={styles.price}>₹1,500</p>
              <p className={styles.pricePill}>12 Hours — Same-Day Return</p>
            </div>

            <ul className={styles.list}>
              <li className={styles.row}>
                <span className={styles.rowLabel}>Additional Hour</span>
                <span className={styles.rowValue}>₹100</span>
              </li>
              <li className={styles.row}>
                <span className={styles.rowLabel}>Food</span>
                <span className={styles.rowValue}>Customer</span>
              </li>
            </ul>

            <h4 className={styles.groupLabel}>Distance-Based — Per Day</h4>
            <ul className={styles.list}>
              <li className={`${styles.row} ${styles.rowAccent}`}>
                <span className={styles.rowBody}>
                  <span className={styles.rowLabel}>Above 500 KM</span>
                  <span className={styles.rowMeta}>Outstation per day</span>
                </span>
                <span className={styles.rowValue}>
                  ₹1,800 <span className={styles.unit}>/ Day</span>
                </span>
              </li>
              <li className={`${styles.row} ${styles.rowAccent}`}>
                <span className={styles.rowBody}>
                  <span className={styles.rowLabel}>Above 600 KM</span>
                  <span className={styles.rowMeta}>Outstation per day</span>
                </span>
                <span className={styles.rowValue}>
                  ₹2,000 <span className={styles.unit}>/ Day</span>
                </span>
              </li>
            </ul>

            <p className={styles.note}>
              Distance-based rates are outstation per-day charges, applied when the trip
              runs beyond the same-day package.
            </p>

            <div className={styles.cardFooter}>
              <Link to="/booking-form" className={`btn btn-primary ${styles.cardBtn}`}>
                Book outstation driver
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
